import connectDB from '@/lib/mongodb';
import { createNewClub } from '@/lib/services/club-service';
import { ClassLevelsType, ClubPricesType, NewClubType, ScheduledClubTimesType, WeekDayType } from '@/lib/utils/types';
import { uploadImageToCloudinary } from '@/lib/utils/uploadImage';
import Ably from 'ably';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // const result = await checkAuth();

    // if (!result) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    // const { userClerkId, role } = result;

    const newFormData = await req.formData();

    const clubName = newFormData.get('clubName')?.toString();
    const clubCategoryName = newFormData.get('clubCategoryName')?.toString();

    const selectedClassLevelNames = JSON.parse(newFormData.get('selectedClassLevelNames')?.toString() || '[]') as ClassLevelsType[];

    const clubPricesRaw = JSON.parse(newFormData.get('clubPrices')?.toString() || '{}') as ClubPricesType;

    const clubImage = newFormData.get('clubImage') as File | null;
    const clubDescription = newFormData.get('clubDescription')?.toString();

    const selectedClubWorkingDays = JSON.parse(newFormData.get('selectedClubWorkingDays')?.toString() || '[]') as WeekDayType[];

    const scheduledClubTimesRaw = JSON.parse(newFormData.get('scheduledClubTimes')?.toString() || '{}') as ScheduledClubTimesType;

    const clubAddress = newFormData.get('clubAddress')?.toString();
    const clubLat = parseFloat(newFormData.get('clubLat')?.toString() || 'NaN');
    const clubLong = parseFloat(newFormData.get('clubLong')?.toString() || 'NaN');
    const teacherImage = newFormData.get('teacherImage') as File | null;
    const teacherName = newFormData.get('teacherName')?.toString();
    const teacherPhone = newFormData.get('teacherPhone')?.toString();
    const teacherEmail = newFormData.get('teacherEmail')?.toString();
    const teacherProfession = newFormData.get('teacherProfession')?.toString();
    const teacherExperience = newFormData.get('teacherExperience')?.toString();
    const teacherAchievement = newFormData.get('teacherAchievement')?.toString();

    console.log({
      clubName,
      clubCategoryName,
      selectedClassLevelNames,
      clubPricesRaw,
      clubImage,
      clubDescription,
      selectedClubWorkingDays,
      scheduledClubTimesRaw,
      clubAddress,
      clubLat,
      clubLong,
      teacherImage,
      teacherName,
      teacherPhone,
      teacherEmail,
      teacherProfession,
      teacherExperience,
      teacherAchievement,
    });

    if (
      !clubName ||
      !clubCategoryName ||
      selectedClassLevelNames.length === 0 ||
      Object.keys(clubPricesRaw).length === 0 ||
      !clubImage ||
      !clubDescription ||
      selectedClubWorkingDays.length === 0 ||
      Object.keys(scheduledClubTimesRaw).length === 0 ||
      !clubAddress ||
      isNaN(clubLat) ||
      isNaN(clubLong) ||
      !teacherImage ||
      !teacherName ||
      !teacherPhone ||
      !teacherEmail ||
      !teacherProfession ||
      !teacherExperience ||
      !teacherAchievement
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let clubImageUrl = '';
    if (clubImage) {
      clubImageUrl = await uploadImageToCloudinary(clubImage);
    }

    let teacherImageUrl = '';
    if (teacherImage) {
      teacherImageUrl = await uploadImageToCloudinary(teacherImage);
    }
    // const clubPrices = new Map(Object.entries(clubPricesRaw));
    // const scheduledClubTimes = new Map(Object.entries(scheduledClubTimesRaw));

    const newClubData: NewClubType = {
      clubName,
      clubCategoryName,
      selectedClassLevelNames,
      clubPrices: clubPricesRaw,
      clubImage: clubImageUrl,
      clubDescription,
      selectedClubWorkingDays,
      scheduledClubTimes: scheduledClubTimesRaw,
      clubAddress,
      clubLat,
      clubLong,
      teacherImage: teacherImageUrl,
      teacherName,
      teacherPhone,
      teacherEmail,
      teacherProfession,
      teacherExperience,
      teacherAchievement,
    };

    const clubCreated = await createNewClub(newClubData);

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('clubs').publish({ name: 'club-created', data: clubCreated });

    return NextResponse.json({ message: 'Club info saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error while saving club info', error);
    return NextResponse.json(
      {
        message: 'Failed to save club info',
      },
      { status: 500 },
    );
  }
}
