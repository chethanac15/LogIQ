interface AnalysisSectionProps {
  title: string;
  content: string;
}

export function AnalysisSection({ title, content }: AnalysisSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-slate-600">
        {content}
      </p>
    </section>
  );
}
