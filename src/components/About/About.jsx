import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__avatar">
        <img
          className="about__photo"
          src={`${import.meta.env.BASE_URL}Justin-lastra.jpeg`}
          alt="Justin Lastra"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I'm Justin Lastra, a web developer who enjoys building clean,
          accessible and user-friendly applications. I work with React,
          JavaScript, HTML and CSS on the front end, and Node.js, Express and
          MongoDB on the back end.
        </p>
        <p className="about__text">
          Through TripleTen's software engineering program I learned to take a
          project from design to deployment. I can help you turn an idea into a
          polished, responsive product.
        </p>
      </div>
    </section>
  );
}

export default About;
