const FooterElement = () => {
  return (
    <div className="text-center pb-2" style={{ paddingTop: "80px" }}>
      <span className="text-small text-muted">
        &copy; {new Date().getFullYear()}. Version 1.1.0
      </span>
    </div>
  );
};

export default FooterElement;
