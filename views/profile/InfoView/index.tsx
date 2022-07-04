import {
  Flex,
  Button,
  Hr,
  TextArea,
  Input,
  Box,
  ProfilePlaceholder,
} from "common/components";
import { useToggle, useAuth } from "lib/hooks";
import { MdOutlineEdit } from "react-icons/md";

const DetailsRow = ({
  item,
  value,
  index,
}: {
  item: string;
  value: string;
  index: number;
}) => (
  <>
    <p css={{ gridRow: index, gridColumn: 1, fontWeight: 600 }}>{item}</p>
    <p css={{ gridRow: index, gridColumn: 2 }}>{value}</p>
  </>
);

const InfoEdit = ({ toggleIsEdit }: { toggleIsEdit: () => void }) => {
  const auth = useAuth();

  if (!auth.success) return null;

  return (
    <Flex>
      <Flex
        css={{
          alignItems: "center",
          padding: "6px",
          marginBottom: "12px",
        }}
      >
        <ProfilePlaceholder size={72} value={auth.username} />
        <div css={{ marginLeft: "16px", flex: "1" }}>
          <p css={{ fontSize: "1.8rem", fontWeight: 700 }}>{auth.username}</p>
          <p css={{ fontSize: "1.4rem", fontWeight: 500 }}>
            gildong@example.com
          </p>
        </div>
        <div>
          <Button onClick={() => toggleIsEdit()} variant="primary-outlined">
            <MdOutlineEdit css={{ fontSize: "1.8rem" }} />
            저장하기
          </Button>
        </div>
      </Flex>
      <Hr />
      <Flex
        column
        css={{
          marginTop: "18px",
          marginBottom: "6px",
          "& > *+*": {
            marginTop: "18px",
          },
          label: { fontSize: "1.4rem", fontWeight: 500 },
          "input, textarea": {
            marginTop: "4px",
            width: "100%",
          },
        }}
      >
        <Flex
          css={{
            "& > *+*": {
              marginLeft: "12px",
            },
          }}
        >
          <Button variant="white">프로필 사진 변경</Button>
        </Flex>
        <div
          css={{
            "& > *+*": {
              marginTop: "12px",
            },
          }}
        >
          <div>
            <label>자기소개</label>
            <TextArea minRows={5} maxRows={5}></TextArea>
          </div>
          <div>
            <label>닉네임</label>
            <Input placeholder="닉네임"></Input>
          </div>
          <div>
            <label>이메일</label>
            <Input placeholder="이메일"></Input>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

const InfoView = () => {
  const [isEdit, toggleIsEdit] = useToggle();
  const auth = useAuth();

  if (!auth.success) return null;

  return (
    <div css={{ width: "100%" }}>
      <Box.Header>내 프로필</Box.Header>
      <Box responsive column>
        {isEdit ? (
          <InfoEdit toggleIsEdit={toggleIsEdit} />
        ) : (
          <>
            <Flex
              css={{
                alignItems: "center",
                padding: "6px",
                marginBottom: "12px",
              }}
            >
              <ProfilePlaceholder size={72} value={auth.username} />
              <div css={{ marginLeft: "16px", flex: "1" }}>
                <p css={{ fontSize: "1.8rem", fontWeight: 700 }}>
                  {auth.username}
                </p>
                <p
                  css={{
                    fontSize: "1.4rem",
                    fontWeight: 500,
                  }}
                >
                  gildong@example.com
                </p>
              </div>
              <div>
                <Button
                  onClick={() => toggleIsEdit()}
                  variant="primary-outlined"
                >
                  <MdOutlineEdit css={{ fontSize: "1.8rem" }} />
                  수정하기
                </Button>
              </div>
            </Flex>
            <Hr />
            <Flex
              column
              css={{
                marginTop: "24px",
                marginBottom: "12px",
                "& > *+*": {
                  marginTop: "24px",
                },
              }}
            >
              <Flex column>
                <p css={{ fontWeight: 700, marginBottom: "4px" }}>자기소개</p>
                <p>
                  주는 반짝이는 그러므로 관현악이며, 것이다. 예수는 온갖 이
                  따뜻한 같지 오직 이것이다. 그들은 관현악이며, 그들은 청춘을
                  천하를 품으며, 광야에서 피어나기 속에 것이다. 가진 지혜는
                  발휘하기 황금시대를 그들에게 뿐이다.
                </p>
              </Flex>
              <Flex column>
                <Flex
                  css={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    columnGap: "32px",
                    rowGap: "4px",
                  }}
                >
                  {[
                    ["닉네임", auth.username!],
                    ["소셜 로그인", "Github"],
                    ["이메일", "gildong@example.com"],
                  ].map((item, index) => (
                    <DetailsRow
                      item={item[0]}
                      value={item[1]}
                      index={index + 1}
                      key={String(index)}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </div>
  );
};

export default InfoView;
