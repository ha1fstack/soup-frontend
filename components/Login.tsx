import styled from "@emotion/styled";
import Dimmer from "./Dimmer";

const Logo = styled.span`
  cursor: pointer;
  font-weight: bold;
  font-size: 28px;
  color: #ff8a05;
`;

const Login = ({ toggle }: { toggle: () => void }) => {
  return (
    <Dimmer onClick={() => toggle()}>
      <div
        css={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          css={{
            width: "480px",
            height: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px 16px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo>SouP</Logo>
        </div>
      </div>
    </Dimmer>
  );
};

export default Login;
