export default function Description({ title, description }) {
  return (
    <>
      <div>
        {console.log({ title })}
        <p>{title ? title : "Not Available"}</p>
        <p>{description}</p>
      </div>
    </>
  );
}
