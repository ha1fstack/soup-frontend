import { Flex, Button, Hr, Input, Box, ProfilePlaceholder } from "common/atoms";
import { http } from "lib/services";
import { useToggle, useAuth } from "lib/hooks";
import { MdOutlineEdit } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import { MouseEventHandler, MutableRefObject, useEffect, useRef } from "react";
import { AxiosResponse } from "axios";

const DetailsRow = ({
  item,
  value,
  index,
}: {
  item: string;
  value?: string;
  index: number;
}) => (
  <>
    <p css={{ gridRow: index, gridColumn: 1, fontWeight: 600 }}>{item}</p>
    <p css={{ gridRow: index, gridColumn: 2 }}>
      {value || <Skeleton width={100} />}
    </p>
  </>
);

const InfoEdit = ({
  handleSubmitRef,
  data,
}: {
  handleSubmitRef: MutableRefObject<
    ((e?: React.BaseSyntheticEvent) => Promise<void>) | undefined
  >;
  data: {
    email: string;
    origin: string;
    success: boolean;
    user_id: number;
    userName: string;
  };
}) => {
  const { register, handleSubmit } = useForm<{
    userName: string;
  }>();
  const queryClient = useQueryClient();
  useEffect(() => {
    handleSubmitRef.current = handleSubmit(async ({ userName }) => {
      const res = await http.post("/nickname", {
        mode: true,
        userName: userName,
      });
      if (res?.data?.success) {
        queryClient.setQueryData(["auth"], {
          ...queryClient.getQueryData(["auth"]),
          userName,
        });
      }
    });
  }, [handleSubmit, handleSubmitRef]);

  return (
    <Flex
      column
      css={{
        marginBottom: "6px",
        "& > *+*": {
          marginTop: "12px",
        },
        label: { fontSize: "1.4rem", fontWeight: 500 },
        "input, textarea": {
          marginTop: "4px",
          width: "100%",
        },
      }}
    >
      <div>
        <label>닉네임</label>
        <Input placeholder={data.userName} {...register("userName")}></Input>
      </div>
    </Flex>
  );
};

const InfoView = () => {
  const [isEdit, toggleIsEdit] = useToggle();
  const auth = useAuth();
  const handleSubmit =
    useRef<(e?: React.BaseSyntheticEvent) => Promise<void>>();

  const { data } = useQuery("profileInfo", async () => {
    return (
      await http.get<{
        email: string;
        origin: string;
        success: boolean;
        user_id: number;
        userName: string;
      }>("/mypage")
    ).data;
  });

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleIsEdit();
    if (isEdit) {
      if (handleSubmit.current) handleSubmit.current();
    }
  };

  if (!auth.success) return null;

  return (
    <div>
      <Box.Header>내 프로필</Box.Header>
      <Box responsive column css={{ padding: "16px" }}>
        <Flex
          css={{
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <ProfilePlaceholder size={64} value={auth.userName} />
          <div css={{ marginLeft: "16px", flex: "1" }}>
            <p css={{ fontSize: "1.8rem", fontWeight: 700 }}>{auth.userName}</p>
            <p
              css={{
                fontSize: "1.4rem",
                fontWeight: 500,
              }}
            >
              {data?.email || <Skeleton width={100} />}
            </p>
          </div>
          <div>
            <Button onClick={handleEdit} variant="primary-outlined">
              <MdOutlineEdit css={{ fontSize: "1.8rem" }} />
              {isEdit ? "저장" : "수정"}
            </Button>
          </div>
        </Flex>
        <Hr />
        <Flex
          column
          css={{
            marginTop: "18px",
            "& > *+*": {
              marginTop: "24px",
            },
          }}
        >
          {/* <Flex column>
                <p css={{ fontWeight: 700, marginBottom: "4px" }}>자기소개</p>
                <p>
                  주는 반짝이는 그러므로 관현악이며, 것이다. 예수는 온갖 이
                  따뜻한 같지 오직 이것이다. 그들은 관현악이며, 그들은 청춘을
                  천하를 품으며, 광야에서 피어나기 속에 것이다. 가진 지혜는
                  발휘하기 황금시대를 그들에게 뿐이다.
                </p>
              </Flex> */}
          <Flex column>
            {isEdit && data ? (
              <InfoEdit data={data} handleSubmitRef={handleSubmit} />
            ) : (
              <Flex
                css={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  columnGap: "32px",
                  rowGap: "4px",
                }}
              >
                {(
                  [
                    ["닉네임", auth.userName!],
                    ["소셜 로그인", data?.origin],
                    ["이메일", data?.email],
                  ] as const
                ).map((item, index) => (
                  <DetailsRow
                    item={item[0]}
                    value={item[1]}
                    index={index + 1}
                    key={String(index)}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default InfoView;
