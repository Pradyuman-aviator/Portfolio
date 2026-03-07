"use client";

import { Music2Icon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Panel, PanelHeader, PanelTitle } from "./panel";

interface TrackData {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isNowPlaying: boolean;
  playedAt: string | null;
  previewUrl: string | null;
}

function SoundBars() {
  return (
    <div className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-green-500"
          style={{
            animation: `soundbar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes soundbar {
          0% {
            height: 3px;
          }
          100% {
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
}

function VinylDisc({
  image,
  isSpinning,
}: {
  image: string;
  isSpinning: boolean;
}) {
  return (
    <div className="relative size-18 shrink-0 sm:size-20">
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg"
        style={{
          animation: isSpinning ? "vinyl-spin 3s linear infinite" : "none",
        }}
      >
        <div className="absolute inset-[6px] rounded-full border border-zinc-700/30" />
        <div className="absolute inset-[10px] rounded-full border border-zinc-700/20" />
        <div className="absolute inset-[14px] rounded-full border border-zinc-700/30" />

        <div className="absolute inset-[18px] overflow-hidden rounded-full">
          {image ? (
            <img
              src={image}
              alt="Album art"
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full bg-gradient-to-br from-zinc-700 to-zinc-800" />
          )}
        </div>

        <div className="absolute inset-0 m-auto size-2 rounded-full bg-zinc-950 ring-1 ring-zinc-700/50" />
      </div>

      <style jsx>{`
        @keyframes vinyl-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-700/30">
      <div
        className="h-full rounded-full bg-green-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function SkeletonLastPlayed() {
  return (
    <div className="flex animate-pulse items-center gap-4 p-4">
      <div className="size-18 rounded-full bg-muted/50 sm:size-20" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-muted/50" />
        <div className="h-4 w-1/2 rounded bg-muted/30" />
        <div className="h-3 w-1/3 rounded bg-muted/20" />
      </div>
    </div>
  );
}

export function LastPlayed() {
  const [track, setTrack] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/lastfm");
        const data = (await res.json()) as { track: TrackData | null };
        setTrack(data.track);
      } catch {
        // Silently fail.
      } finally {
        setLoading(false);
      }
    }

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = useCallback(() => {
    if (!track?.previewUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(track.previewUrl);

      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          const pct =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(pct);
        }
      });

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track?.previewUrl, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <Panel id="last-played">
      <PanelHeader>
        <PanelTitle>
          <span className="flex flex-wrap items-center gap-2">
            Last Played
            {track?.isNowPlaying && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                <SoundBars />
                Now Playing
              </span>
            )}
          </span>
        </PanelTitle>
      </PanelHeader>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0%,
            100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.25;
            }
          }
        `}</style>

        {loading ? (
          <SkeletonLastPlayed />
        ) : track ? (
          <div className="p-4">
            <div className="flex items-start gap-4">
              <VinylDisc
                image={track.image}
                isSpinning={isPlaying || track.isNowPlaying}
              />

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-base font-semibold">
                  {track.name}
                </span>
                <span className="truncate text-sm text-muted-foreground">
                  {track.artist}
                </span>
                {track.album && (
                  <span className="truncate text-xs text-muted-foreground/60">
                    {track.album}
                  </span>
                )}
                {track.playedAt && !track.isNowPlaying && (
                  <span className="text-xs text-muted-foreground/40">
                    {track.playedAt}
                  </span>
                )}
              </div>

              {track.previewUrl ? (
                <button
                  onClick={togglePlay}
                  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-green-500 text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:scale-105 hover:shadow-green-500/40 active:scale-95"
                  aria-label={isPlaying ? "Pause preview" : "Play 30s preview"}
                  title={isPlaying ? "Pause preview" : "Play 30-second preview"}
                >
                  {isPlaying ? (
                    <svg
                      className="size-4.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="ml-0.5 size-4.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              ) : (
                <a
                  href={track.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:scale-105 hover:shadow-green-500/40"
                  title="Listen on Last.fm"
                >
                  <svg
                    className="ml-0.5 size-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              )}
            </div>

            {track.previewUrl && (isPlaying || progress > 0) && (
              <ProgressBar progress={progress} />
            )}

            {isPlaying && (
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/50">
                30-second preview
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted-foreground">
            <Music2Icon className="size-4" aria-hidden />
            <p>No recent tracks found. Start listening.</p>
          </div>
        )}
      </div>
    </Panel>
  );
}
