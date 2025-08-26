import type { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <>
      <div className="space-y-6 text-white">
        <p className="text-5xl font-black text-center">{data.handle}</p>
        {data.image && (
          <img
            src={data.image}
            alt="Handle Logo"
            className="max-w-[250px] mx-auto rounded-full"
          />
        )}
        <p className="text-lg font-black text-center">{data.description}</p>
        <div className="flex flex-col items-center gap-6 mt-20 ">
          {links.length ? (
            links.map((link) => (
              <a
                key={link.id}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center w-2/3 gap-5 px-5 py-2 bg-white rounded-lg"
                href={link.url}
              >
                <img
                  src={`/social/icon_${link.name}.svg`}
                  alt="Social App Image"
                  className="w-12"
                />
                <p className="text-lg font-bold text-black capitalize">
                  Go to my: {link.name}
                </p>
              </a>
            ))
          ) : (
            <p className="text-center"> No Links Found </p>
          )}
        </div>
      </div>
    </>
  );
}
