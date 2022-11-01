import { Timeline, Button } from "flowbite-react";

type AboutMeProps = {
  aboutData: { aboutText: string; experience: [] };
};

function AboutMe(props: AboutMeProps) {
  return (
    <div className="container flex flex-row space-x-4 items-start">
      <div className="basis-3/5 bg-white rounded text-black p-10">
        <h3>🎯 About me</h3>
        <span>
          💻 I'm a professional, competent and passionate Software Engineer. I'm
          experienced in web development, frontend design and UI, which I find
          very rewarding. I also have knowledge in backend, ReST APIs and
          database design, which allows me to easily adapt to most job
          positions, being able to work as a full-stack developer.
          <br />⚡ I tend to be very (VERY) fast developing features in
          technologies I'm confortable with. But learning a new stack is not a
          problem for me, but rather another strength. My eager to learn has
          pushed me from frontend into architecture design and cloud services.
          <div></div>
          👨🏻‍🏫 I enjoy teamworking and pursuing sinergies to get the best of me
          and the team. I'm always willing to (constructively) criticize design,
          processes and approaches; and also to be criticized in order to learn
          and improve my outcomes. I've developed most of my career in english
          and, thus, I can effectively communicate with my coworkers whether
          they speak english or spanish.
          <div></div>
          🛠 Regarding coding and development knowledge, I'm devoted to clean
          code practices, design patterns, refactoring principles and continuous
          integration/deployment techniques. I may write good or bad code but
          I'm always aware of its quality.
          <div></div>
          📈 I'm also a solid defender of agile development and certified Scrum
          Master, and I've some knowledge in agile project management.
        </span>
      </div>
      <div className="basis-2/5 bg-white rounded text-black p-10">
        <h3>Experience</h3>
        <Timeline>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>February 2022</Timeline.Time>
              <Timeline.Title>
                Application UI code in Tailwind CSS
              </Timeline.Title>
              <Timeline.Body>
                Get access to over 20+ pages including a dashboard layout,
                charts, kanban board, calendar, and pre-order E-commerce &
                Marketing pages.
              </Timeline.Body>
              <Button color="gray">
                Learn More
                {/* <HiArrowNarrowRight className="ml-2 h-3 w-3" /> */}
              </Button>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>March 2022</Timeline.Time>
              <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
              <Timeline.Body>
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>March 2022</Timeline.Time>
              <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
              <Timeline.Body>
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>March 2022</Timeline.Time>
              <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
              <Timeline.Body>
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>March 2022</Timeline.Time>
              <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
              <Timeline.Body>
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>March 2022</Timeline.Time>
              <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
              <Timeline.Body>
                All of the pages and components are first designed in Figma and
                we keep a parity between the two versions even as we update the
                project.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
}

export default AboutMe;
