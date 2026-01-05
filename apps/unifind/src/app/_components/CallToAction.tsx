import { Button } from '../components/ui/button';

export function CallToAction() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Суралцах аяллаа эхлүүлэхэд бэлэн үү?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Үнэгүй бүртгэл үүсгэж, сонирхсон их сургуулиудаа хадгалах, элсэлтийн хугацааг хянах болон танд тохирсон зөвлөмжүүдийг хүлээж аваарай.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-8">
              Үнэгүй бүртгэл үүсгэх
            </Button>
            <Button size="lg" variant="outline">
              Дэлгэрэнгүй мэдээлэл
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
