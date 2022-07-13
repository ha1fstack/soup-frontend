const Iframe = ({ src, className }: { src?: string; className?: string }) => {
  if (!src) return null;
  return (
    <iframe
      src={src}
      frameBorder="0"
      css={{
        width: "100%",
        height: "calc(100vh - 128px)",
        borderRadius: "16px",
      }}
      className={className}
    />
  );
};

export default Iframe;
