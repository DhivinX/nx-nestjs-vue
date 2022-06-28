<template>
    <div class="full-width bg-white border-bottom-accent">
        <div class="container">
            <div class="flex items-center q-mt-lg q-mb-lg">
                <q-avatar size="72px">
                    <q-img :src="props.avatar" :alt="props.title" />
                </q-avatar>
                <h4 class="q-my-none q-ml-lg text-weight-bold">
                    {{ props.title }}
                </h4>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
    avatar: string;
}

const props = defineProps<Props>();
</script>
