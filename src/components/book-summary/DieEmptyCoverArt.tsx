/**
 * Stand-in for the reference 3D “Die Empty” cover (cream + terracotta, serif title).
 */
export default function DieEmptyCoverArt() {
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center sm:min-h-[380px] lg:min-h-[440px]">
      <div
        className="relative w-[52%] max-w-[220px] rounded-r-md shadow-[12px_18px_40px_rgba(30,20,10,0.22)]"
        style={{ aspectRatio: "2 / 3" }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-r-md bg-[#f5f0e6]"
          style={{
            transform: "perspective(900px) rotateY(-14deg)",
            transformOrigin: "center center",
          }}
        >
          <div className="absolute -left-4 -top-8 h-32 w-[140%] rounded-full bg-[#AF5B1F]/90 blur-[2px]" />
          <div className="absolute -bottom-10 left-0 h-36 w-full rounded-full bg-[#AF5B1F]/85" />
          <div className="relative flex h-full flex-col items-center justify-center px-6 pt-8">
            <p className="text-center font-serif text-lg font-bold leading-tight tracking-[0.12em] text-black sm:text-xl">
              DIE
              <br />
              EMPTY
            </p>
          </div>
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-r from-black/12 to-transparent" />
        </div>
        <div
          className="absolute -left-3 top-3 bottom-3 w-3 rounded-l-sm bg-gradient-to-r from-[#d4cfc4] to-[#ebe6dc] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.12)]"
          style={{
            transform: "perspective(900px) rotateY(-14deg)",
            transformOrigin: "right center",
          }}
        />
      </div>
    </div>
  );
}
