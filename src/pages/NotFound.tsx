interface Props {
  isChildView?: boolean;
}

export default function NotFound({ isChildView = false }: Props) {
  return isChildView ? (
    <>
      <p>Page Not Found</p>
    </>
  ) : (
    <>
      <section className="task-view">
        <p>Page Not Found </p>
      </section>
    </>
  );
}
