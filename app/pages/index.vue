<template>
  <div class="page">
    <AppBanner />

    <!-- 메인 뉴스 -->
    <MainContent :data="store.mainArticle" />
    <SkeletonMainContent />

    <Separator label="Or" class="my-6" />

    <!-- 최신 뉴스 -->
    <div class="w-full flex flex-col gap-6">
      <div class="w-full flex items-center justify-between">
        <h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">
          Latest News
        </h4>
        <Button class="bg-red-500 hover:bg-red-600">See all</Button>
      </div>
      <div class="w-full grid grid-cols-4 gap-y-20 gap-x-6">
        <SubContent v-for="article in store.subArticles" :data="article" />
        <SkeletonSubContent />
        <SkeletonSubContent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppBanner, MainContent, SubContent } from "~/components/common";
import { SkeletonMainContent, SkeletonSubContent } from "~/components/skeleton";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useStore } from "~/store";

const store = useStore();

onMounted(() => {
  store.getNews();
});
</script>
