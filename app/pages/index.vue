<template>
  <div class="page">
    <AppBanner />

    <!-- 메인 뉴스 -->
    <SkeletonMainContent v-if="loading === 'pending'" />
    <MainContent v-else :data="mainArticle" />

    <Separator label="Or" class="my-6" />

    <!-- 최신 뉴스 -->
    <div class="w-full flex flex-col gap-6">
      <div class="w-full flex items-center justify-between">
        <h4 class="scroll-m-20 text-2xl font-semibold tracking-tight">
          Latest News
        </h4>
        <Button class="bg-red-500 hover:bg-red-600">See all</Button>
      </div>
      <div
        v-if="loading === 'pending'"
        class="w-full grid grid-cols-4 gap-y-20 gap-x-6"
      >
        <SkeletonSubContent />
        <SkeletonSubContent />
      </div>
      <div v-else class="w-full grid grid-cols-4 gap-y-20 gap-x-6">
        <SubContent v-for="article in subArticles" :data="article" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { AppBanner, MainContent, SubContent } from "~/components/common";
import { SkeletonMainContent, SkeletonSubContent } from "~/components/skeleton";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { Article } from "~/types";

// useAsyncData를 사용하여 데이터를 비동기적으로 가져옵니다.
const { data: newsData, status: loading } = useAsyncData("news", async () => {
  const searchValue = "korea"; // 기본 검색어
  const API_KEY = useRuntimeConfig().public.newsApiKey;
  const API_URL = `https://newsapi.org/v2/everything?q=${searchValue}&from=2026-05-01&sortBy=popularity&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(API_URL);
    const articles = response.data.articles
      .map((article: Article) => {
        if (article.urlToImage !== null) return article;
      })
      .filter((article: Article) => article !== undefined);

    if (articles.length > 0) {
      return { mainArticle: articles[0], subArticles: articles.slice(1) };
    } else {
      return { mainArticle: null, subArticles: [] };
    }
  } catch (error) {
    throw error;
  }
});

const mainArticle = newsData.value?.mainArticle ?? null; // null 또는 undefined 처리
const subArticles = newsData.value?.subArticles ?? []; // 빈 배열로 기본값 처리
</script>
