import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatsPage = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="cffce686-2385-45fd-b88d-a85e61a209d4"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;