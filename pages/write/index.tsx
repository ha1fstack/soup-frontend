import { JSONContent } from "@tiptap/react";
import { Box, Flex, Input, Button } from "common/components";
import { SectionHeader } from "common/components/Section";
import { http } from "common/services";
import { Editor } from "components";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface IArticleData {
  title: string;
  content: JSONContent;
}

const Write = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IArticleData>({
    mode: "all",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IArticleData> = async (data) => {
    console.log(data);
    const res = await http.post<{ success: boolean }>("/project/build", data);
    if (res.data.success) {
      alert("ok");
      router.push("/projects");
    } else alert("알 수 없는 오류 발생");
  };

  return (
    <div
      css={{
        maxWidth: "960px",
      }}
    >
      <SectionHeader>
        <SectionHeader.Title>새 모집 만들기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          responsive
          column
          css={{
            padding: "16px",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <Flex
            css={{
              justifyContent: "space-between",
            }}
          >
            <Input
              {...register("title")}
              css={{ maxWidth: "480px", flex: "1 0 auto" }}
              placeholder="제목"
            />
            <Button type="submit" variant="primary">
              작성
            </Button>
          </Flex>
          <Box column>
            <Editor setValue={setValue} />
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Write;
