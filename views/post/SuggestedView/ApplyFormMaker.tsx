import { AxiosError } from "axios";
import { Button, Flex, TextArea } from "common/atoms";
import copy from "copy-to-clipboard";
import { http } from "lib/services";
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!data)
    return (
      <Button
        size="small"
        disabled={isLoading || isError}
        onClick={() => mutate({ id })}
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
