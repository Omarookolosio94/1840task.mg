import { Link } from 'react-router-dom';

interface Props {
  isChildView?: boolean;
}

export default function NotFound({ isChildView = false }: Props) {
  return isChildView ? (
    <section className="task-view">
      <div className="main-header">
        <h5 className="title">Page Not Found</h5>

        <Link to="/new" className="btn">
          Add Task
        </Link>
      </div>

      <div className="empty-state">
        <p>Resource you are looking for does not exist</p>
      </div>
    </section>
  ) : (
    <div className="empty-state">
      <p>Resource you are looking for does not exist</p>
    </div>
  );
}
