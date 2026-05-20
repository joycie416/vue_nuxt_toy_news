<template>
  <div class="w-full flex items-center gap-6">
    <Skeleton class="w-1/3 h-full rounded-lg" />
    <div class="w-2/3 flex flex-col gap-6">
      <!-- 프로필 정보 -->
      <div class="flex items-center gap-2">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-20 h-5 rounded-lg" />
        &middot;
        <Skeleton class="w-32 h-5 rounded-lg" />
      </div>
      <!-- 텍스트 콘텐츠 1 -->
      <div class="w-full flex flex-col gap-2">
        <Skeleton class="w-full h-10 rounded-lg" />
        <Skeleton class="w-full h-10 rounded-lg" />
      </div>
      <!-- 텍스트 콘텐츠 2 -->
      <div class="w-full flex flex-col gap-2">
        <Skeleton class="w-full h-5 rounded-lg" />
        <Skeleton class="w-full h-5 rounded-lg" />
        <Skeleton class="w-full h-5 rounded-lg" />
      </div>
      <!-- 추가 정보 -->
      <div class="flex items-center gap-2">
        <Skeleton class="w-20 h-5 rounded-lg" />
        &middot;
        <Skeleton class="w-20 h-5 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "../ui/skeleton";
</script>
