<template>
    <div class="full-width bg-white border-bottom-accent">
        <div class="container">
            <div class="row items-center q-mt-lg q-mb-lg">
                <q-icon :name="props.icon" class="q-mr-md" size="xl" />
                <h4 class="q-my-none text-weight-bold">
                    {{ props.title }}
                </h4>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
    icon: string;
}

const props = defineProps<Props>();
</script>
