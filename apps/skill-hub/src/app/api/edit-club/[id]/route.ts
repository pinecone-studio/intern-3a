import { NewClub } from '@/lib/models/Club';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { NewClubType } from '@/lib/utils/types';
import { uploadImageToCloudinary } from '@/lib/utils/uploadImage';
import Ably from 'ably';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '../../check-create-user/route';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const result = await checkAuth();
    if (!result) {
      return NextResponse.json({ message: 'Зөвшөөрөлгүй оролдлого!' }, { status: 401 });
    }

    const { id } = await params;
    const { userClerkId } = result;

    const creator = await User.findOne({ userClerkId }, '_id');
    const adminId = creator?._id;

    const formData = await request.formData();

    const clubCategoryName = formData.get('clubCategoryName') as string;
    const clubSubCategoryName = formData.get('clubSubCategoryName') as string;
    const clubName = formData.get('clubName') as string;
    const clubDescription = formData.get('clubDescription') as string;
    const clubAddress = formData.get('clubAddress') as string;
    const clubLat = Number(formData.get('clubLat'));
    const clubLong = Number(formData.get('clubLong'));
    const clubImage = formData.get('clubImage') as File | null;

    if (!clubCategoryName || !clubSubCategoryName || !clubName || !clubDescription || !clubAddress) {
      return NextResponse.json({ message: 'Бүх талбарыг бөглөнө үү' }, { status: 400 });
    }

    let imageUrl = '';

    if (clubImage instanceof File) {
      imageUrl = await uploadImageToCloudinary(clubImage);
    } else if (typeof clubImage === 'string') {
      imageUrl = clubImage;
    }

    const updateData: Partial<NewClubType> = {
      clubCategoryName,
      clubSubCategoryName,
      clubName,
      clubDescription,
      clubAddress,
      clubLat,
      clubLong,
      adminId,
      clubImage: imageUrl,
    };

    const updatedClub = await NewClub.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });

    if (!updatedClub) {
      return NextResponse.json({ message: 'Дугуйлан олдсонгүй' }, { status: 404 });
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('clubs').publish('club-updated', updatedClub);

    return NextResponse.json({ message: 'Дугуйлан амжилттай засагдлаа', data: updatedClub }, { status: 200 });
  } catch (error) {
    console.error('Дугуйлан засахад алдаа гарлаа', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
