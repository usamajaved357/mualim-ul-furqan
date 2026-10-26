import { homework } from '../data';
import { CheckItem } from './CheckItem';

export function HomeworkPanel() {
  return (
    <div className="flex flex-col gap-2.5">
      {homework.map((h) => (
        <CheckItem key={h.task} done={h.done} label={h.task} meta={h.due} />
      ))}
    </div>
  );
}
