<template>
    <div class="full-width bg-white border-bottom-accent">
        <div class="container">
            <h4 class="q-my-none q-mt-lg text-weight-bold">
                {{ $t('dashboard.welcome', { name: accountStore.state.firstName }) }}
            </h4>
            <p class="q-mb-lg">{{ accountStore.state.email }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
const accountStore = useAccountStore();
</script>
