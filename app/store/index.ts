import type { Article } from "@/types";
import axios from "axios";

export const useStore = defineStore("news", () => {
  // state
  const searchValue = ref<string>("korea");
  const mainArticle = ref<Article | null>(null);
  const subArticles = ref<Article[] | null>(null);
  const noDataMessage = ref<string | null>(null);

  // action
  const changeSearchValue = (payload: string) => {
    searchValue.value = payload;
  };
  const getNews = async () => {
    const API_KEY = useRuntimeConfig().public.newsApiKey;
    const API_URL = `https://newsapi.org/v2/everything?q=${searchValue.value}&from=2026-05-01&sortBy=popularity&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);
      const articles = response.data.articles
        .map((article: Article) => {
          if (!!article.urlToImage) return article;
        })
        .filter((article: Article) => !!article);

      if (articles.length > 0) {
        mainArticle.value = articles[0] || null;
        subArticles.value = articles.slice(1);
        noDataMessage.value = null;
      } else {
        noDataMessage.value = "there is no matching articles";
      }
    } catch (error) {
      throw error;
    }
  };

  return { searchValue, mainArticle, subArticles, changeSearchValue, getNews };
});
