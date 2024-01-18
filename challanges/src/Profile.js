const skills = require("./skills.json");

const Profile = () => {
  return (
    <div className="container">
      <p>Challange #1: User Profile</p>
      <div className="card">
        <div className="data">
          <Intro />
          <SkillList />
        </div>
      </div>
    </div>
  );
}

const Intro = () => {
  return (
    <div>
      <h1>John Doe</h1>
      <p>
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit..."
      </p>
    </div>
  );
};

const SkillList = () => {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill data={skill} key={skill.name} />
      ))}
    </div>
  );
};

const Skill = (props) => {
  const { name, emoji, background } = props.data;

  return (
    <div className="skill" style={{ backgroundColor: background }}>
      <span>{`${name} ${emoji}`}</span>
    </div>
  );
};

export default Profile;
