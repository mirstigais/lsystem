<template>
  <h1>{{ $t('header.credits') }}</h1>
  <div class="credits-content">
    <h2> {{ $t('credits.content') }} </h2>
    <div class="video-embed">
      <iframe src="https://www.youtube.com/embed/3Mu0--aGfqg?si=DBfuRYTv1pF0HcMs" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div> {{ $t('credits.content2') }} </div>
    <div class="video-embed">
      <iframe src="https://www.youtube.com/embed/puwhf-404Xc?si=I1Ha9fG777ieJ-66" title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div> {{ $t('credits.content3') }} </div>
    <h3> {{ $t('header.credits.citations') }} </h3>
    <div>
      <a href="https://en.wikipedia.org/wiki/L-system#/media/File:Fractal_Farn.gif"> {{ $t('credits.citations1') }}</a>
    </div>
    <h3> {{ $t('header.credits.tools') }} </h3>
    <a href="https://github.com/mirstigais/lsystem"> {{ $t('credits.content4') }} </a>
    <CreditsTable />
  </div>
  <br>
</template>

<script setup lang="ts">
import CreditsTable from '@components/CreditsTable.vue';
</script>