interface VideoPlayerProps {
  kinescopeId: string
  token: string
  title: string
}

export function VideoPlayer({ kinescopeId, token, title }: VideoPlayerProps) {
  const src = token
    ? `https://kinescope.io/embed/${kinescopeId}?t=${token}`
    : `https://kinescope.io/embed/${kinescopeId}`

  return (
    <div className="relative w-full h-full bg-black">
      <iframe
        src={src}
        frameBorder={0}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="w-full h-full"
        title={title}
      />
    </div>
  )
}
