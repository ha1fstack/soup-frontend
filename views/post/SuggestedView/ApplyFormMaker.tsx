import { AxiosError } from "axios";
import { Button, Flex, TextArea } from "common/atoms";
import copy from "copy-to-clipboard";
import { useSetAtom } from "jotai";
import { useAuth } from "lib/hooks";
import { http } from "lib/services";
import { loginPopupState } from "lib/states";
import { useRef } from "react";
import { useMutation } from "react-query";

const ApplyFormMaker = ({ id }: { id: string }) => {
  const { data, isLoading, isError, mutate } = useMutation<
    string,
    AxiosError,
    {
      id: string;
    }
  >(async (data) => {
    const res = await http.post(`/projects/form`, data);
    return res.data.form;
  });

  const auth = useAuth();
  const setLoginPopup = useSetAtom(loginPopupState);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!data)
    return (
      <Button
        size="small"
        disabled={isLoading || isError}
        onClick={() => (auth.success ? mutate({ id }) : setLoginPopup(true))}
      >
        만들기
      </Button>
    );
  return (
    <Flex column gap="12px">
      <Button
        size="small"
        disabled={isLoading}
        onClick={() => textAreaRef.current && copy(textAreaRef.current.value)}
      >
        복사하기
      </Button>
      <TextArea
        ref={textAreaRef}
        spellCheck={false}
        css={{ fontSize: "1.3rem" }}
        defaultValue={data}
        minRows={5}
      />
    </Flex>
  );
};

export default ApplyFormMaker;
