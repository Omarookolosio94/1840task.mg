import { useParams } from 'react-router-dom';

export default function SingleTask() {
  const { id } = useParams();

  return (
    <section className="task-view">
      <div>SingleTask</div>

      <p>View single task - {id}</p>
    </section>
  );
}
