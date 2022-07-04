import styled from "@emotion/styled";
import { Box, Button, Flex, ProfilePlaceholder } from "common/components";
import { http } from "common/services";
import { useAuth } from "lib/hooks";
import { useEffect } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { useQuery } from "react-query";
import ReactTextareaAutosize from "react-textarea-autosize";

const LoungeEditor = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ILoungeForm>({
    mode: "all",
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const watchContent = watch("content", "");

  const onSubmit = async (data: any) => {
    const res = await http.post<{ success: boolean }>("/lounge/add", data);
    if (res.data.success) {
      reset();
      refetch();
    } else alert("알 수 없는 오류 발생");
  };

  const { refetch } = useQuery("lounge", async () => {
    return (await http.get("/lounge")).data;
  });

  if (!auth.success) return null;

  return (
    <Box responsive column css={{ padding: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex column css={{ gap: "0px" }}>
          <Flex css={{ gap: "18px" }}>
            <ProfilePlaceholder size={48} value={auth.username} />
            <LoungeEditorTextArea register={register} />
          </Flex>
          <LoungeEditorDialog>
            <span>{watchContent?.length}/500</span>
            <LoungeEditorSubmitButton disabled={!!Object.keys(errors).length} />
          </LoungeEditorDialog>
        </Flex>
      </form>
    </Box>
  );
};

export default LoungeEditor;

const LoungeEditorTextArea = ({
  register,
}: {
  register: UseFormRegister<ILoungeForm>;
}) => (
  <ReactTextareaAutosize
    placeholder="간단한 이야기를 작성해 보세요..."
    {...register("content", {
      required: true,
      minLength: 10,
      maxLength: 500,
    })}
    css={{
      background: "transparent",
      fontSize: "1.8rem",
      marginTop: "10px",
      flex: "1 0 auto",
      resize: "none",
      borderWidth: "0px",
      ":focus": {
        outline: "0px",
      },
    }}
    maxLength={500}
    minRows={3}
    spellCheck="false"
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
  />
);

interface ILoungeForm {
  content: string;
}

const LoungeEditorDialog = styled(Flex)({
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "12px",
  lineHeight: "initial",
});

const LoungeEditorSubmitButton = ({ disabled }: { disabled: boolean }) => (
  <Button disabled={disabled} type="submit" variant="primary">
    작성하기
  </Button>
);
