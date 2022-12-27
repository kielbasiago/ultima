export type DisclaimerProps = Record<string, unknown>;

export const Disclaimer = ({}: DisclaimerProps) => {
  return (
    <div className="flex flex-col gap-2 w-full min-h-[75px] justify-center items-center bg-gray-600 text-white text-xs">
      <p>Created by Kielbasiago</p>
      <p>
        Final Fantasy VI: Worlds Collide is an unofficial fan project not
        affiliated in any way with Square Enix
      </p>
    </div>
  );
};
