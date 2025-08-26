import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SocialNetwork } from "../types";

type DevTreeLinkProps = {
  link: SocialNetwork;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <li
        ref={setNodeRef}
        className="flex items-center gap-5 px-5 py-2 bg-white rounded-lg hover:cursor-pointer hover:scale-105"
        style={style}
        {...attributes}
        {...listeners}
      >
        <div
          className="w-12 h-12 bg-cover "
          style={{ backgroundImage: `url("/social/icon_${link.name}.svg")` }}
        ></div>
        <p className="capitalize">
          Follow me on: <span className="font-black">{link.name}</span>
        </p>
      </li>
    </>
  );
}
