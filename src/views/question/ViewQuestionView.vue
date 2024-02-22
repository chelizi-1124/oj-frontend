<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs ref="tabsRef" default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" ref="myCardRef" :title="question.title">
              <MdViewer :value="question.content || ''" />
              <a-space direction="vertical" fill>
                <a-descriptions
                  v-for="(caseItem, index) in question.judgeCase"
                  :key="index"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                  layout="inline-vertical"
                >
                  <a-descriptions-item :label="`输入用例 ${index + 1}`">
                    <a-card hoverable>
                      {{ caseItem["input"] || "无" }}
                    </a-card>
                  </a-descriptions-item>
                  <a-descriptions-item :label="`输出用例 ${index + 1}`">
                    <a-card hoverable>
                      {{ caseItem["output"] || "无" }}
                    </a-card>
                  </a-descriptions-item>
                </a-descriptions>
              </a-space>
              <a-card hoverable style="margin-top: 10px">
                <a-descriptions :column="{ xs: 1, md: 2, lg: 3 }">
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }} ms
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig.memoryLimit ?? 0 }} KB
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig.stackLimit ?? 0 }} KB
                  </a-descriptions-item>
                </a-descriptions>
              </a-card>
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" disabled title="评论"> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <!--        style="max-height: 100vh; min-width: 50vh; height: 68vh"-->
        <CodeEditor
          :handle-change="changeCode"
          :language="form.language as any"
          :style="{ height: computedEditorHeight + 'px' }"
          :value="form.code as string"
        />
        <a-divider size="0" />
        <a-button
          style="min-width: 200px; margin-top: 8px"
          type="primary"
          @click="doSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";

type ElementRef = { value: { $el: HTMLElement } | null };

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const question = ref<QuestionVO>();
const myCardRef: ElementRef = ref(null);
const computedEditorHeight = ref<number>(0);
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestonSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
  // 监控 card 高度变化
  watch(
    () => myCardRef.value?.$el.offsetHeight,
    (newHeight) => {
      if (typeof newHeight === "number") {
        console.log("Card Height Changed:", newHeight);
        computedEditorHeight.value = newHeight - 45;
      }
    }
  );
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style lang="scss">
#viewQuestionView {
  width: 1280px;
  min-width: 500px;
  margin: 0 auto;
}

.arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.arco-descriptions-item,
.arco-descriptions-item-label,
.arco-descriptions-item-value {
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5715;
  text-align: left;
  display: block;
}
</style>
