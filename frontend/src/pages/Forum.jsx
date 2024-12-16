import { Navbar } from "../components/Navbar";
import CommentsList from "../components/dissforum";
function Forum() {
  let momentsarray = [
    {
      id: 1,
      opinion: "New to this app how does things work in forum",
      username: "Khizer",
      timestamp: "2024-07-01",
      votes: 79,
    },
    {
      id: 1,
      opinion: "Wheres the tutorial? ui looks useable would love a tutorial",
      username: "Ahad",
      timestamp: "2024-07-01",
      votes: 39,
    },
    {
      id: 1,
      opinion: "Lahore has huge food business potential honestly",
      username: "Alyan",
      timestamp: "2024-07-01",
      votes: 99,
    },
    {
      id: 1,
      opinion: "Islamabad What do you have to offer to us entrepreuners",
      username: "Hussain",
      timestamp: "2024-07-01",
      votes: 9,
    },
    {
      id: 1,
      opinion: "Analyze indvidual areas effortlessly with Optiventure AI",
      username: "Alyan",
      timestamp: "2024-07-01",
      votes: 7,
    },
    {
      id: 1,
      opinion: "Lets hope this works i tried learning it",
      username: "khizer",
      timestamp: "2024-07-01",
      votes: 9,
    },
    {
      id: 1,
      opinion: "Is karachi the business hub? what do u think",
      username: "Alyan",
      timestamp: "2024-07-01",
      votes: 3,
    },
    {
      id: 1,
      opinion: "You can downvote or upvote comments",
      username: "Alyan",
      timestamp: "2024-07-01",
      votes: 21,
    },
    {
      id: 3,
      opinion: "I think it could use some tweaks, but it's solid.",
      username: "CodeMaster",
      timestamp: "2024-07-03",
      votes: 8,
    },
    {
      id: 4,
      opinion: "Why isn't this already a standard feature?",
      username: "CuriousCat",
      timestamp: "2024-07-04",
      votes: 42,
    },
    {
      id: 5,
      opinion: "Not sure if I like it yet. - comment made on Optiventure forum",
      username: "SkepticSam",
      timestamp: "2024-07-05",
      votes: -3,
    },
    {
      id: 6,
      opinion: "Amazing addition! Makes everything smoother.",
      username: "PositiveVibes",
      timestamp: "2024-07-06",
      votes: 56,
    },
    {
      id: 7,
      opinion:
        "Could be improved, but not bad. - comment made on Optiventure forum",
      username: "FixerUpper",
      timestamp: "2024-07-07",
      votes: 12,
    },
    {
      id: 8,
      opinion:
        "This is unnecessary, honestly. - comment made on Optiventure forum",
      username: "GrumpyGoose",
      timestamp: "2024-07-08",
      votes: -8,
    },
    {
      id: 10,
      opinion:
        "It works, but the interface needs polishing . - comment made on Optiventure forum",
      username: "UIFanatic",
      timestamp: "2024-07-10",
      votes: 20,
    },
    {
      id: 11,
      opinion:
        "Love how intuitive this feels! - comment made on Optiventure forum",
      username: "IntuitionKing",
      timestamp: "2024-07-11",
      votes: 48,
    },
    {
      id: 12,
      opinion:
        "This is just okay. I've seen better. - comment made on Optiventure forum",
      username: "RealistRider",
      timestamp: "2024-07-12",
      votes: 5,
    },
    {
      id: 13,
      opinion: "Great feature, but it can be confusing at first.",
      username: "NewbieGuide",
      timestamp: "2024-07-13",
      votes: 18,
    },
    {
      id: 14,
      opinion:
        "I’m neutral about this one. - comment made on Optiventure forum",
      username: "NeutralNed",
      timestamp: "2024-07-14",
      votes: 0,
    },
    {
      id: 15,
      opinion: "Fantastic! Keep it up. - comment made on Optiventure forum",
      username: "Cheerleader93",
      timestamp: "2024-07-15",
      votes: 62,
    },
    {
      id: 16,
      opinion:
        "This needs more testing before release. - comment made on Optiventure forum",
      username: "QAQueen",
      timestamp: "2024-07-16",
      votes: 11,
    },
    {
      id: 17,
      opinion:
        "It’s a step in the right direction. - comment made on Optiventure forum",
      username: "Optimist99",
      timestamp: "2024-07-17",
      votes: 24,
    },
    {
      id: 18,
      opinion: "Who even asked for this? - comment made on Optiventure forum",
      username: "NegativeNancy",
      timestamp: "2024-07-18",
      votes: -12,
    },
    {
      id: 19,
      opinion:
        "Super useful for my workflow! - comment made on Optiventure forum",
      username: "Workhorse",
      timestamp: "2024-07-19",
      votes: 37,
    },
    {
      id: 20,
      opinion: "Definitely an improvement over the previous version.",
      username: "ChangeSeeker",
      timestamp: "2024-07-20",
      votes: 29,
    },
  ];
  return (
    <>
      <Navbar />
      <CommentsList moments={momentsarray} />
    </>
  );
}
export default Forum;
