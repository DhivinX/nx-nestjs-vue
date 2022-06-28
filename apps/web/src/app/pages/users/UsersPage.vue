<template>
    <AppPage :loading="usersAction.counter === 0">
        <template v-slot:header>
            <AppPageHeader :title="$t('routes.users')" icon="mdi-account-supervisor" />
        </template>

        <AppCard :loading="!usersAction.isReady">
            <q-card-actions>
                <q-space />
                <q-btn
                    icon="mdi-plus"
                    :label="$t('add')"
                    :loading="usersAction.isLoading"
                    :disable="usersAction.isLoading"
                    color="primary"
                    rounded
                    @click="userCreateDialog"
                />
            </q-card-actions>

            <q-card-section>
                <q-markup-table class="no-shadow">
                    <thead>
                        <tr>
                            <th class="text-left"></th>
                            <th class="text-left">{{ $t('users.list.first_and_last_name') }}</th>
                            <th class="text-left">{{ $t('users.list.email') }}</th>
                            <th class="text-left">{{ $t('users.list.role') }}</th>
                            <th class="text-left">{{ $t('users.list.created_at') }}</th>
                            <th class="text-right">{{ $t('users.list.edit') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="user in usersAction.state.elements"
                            :key="user.id"
                            :class="user.id === accountStore.state.id ? 'text-grey-7' : ''"
                        >
                            <td class="text-left">
                                <q-avatar size="40px">
                                    <q-img
                                        :src="user.avatar"
                                        :alt="`${user.firstName} ${user.lastName}`"
                                    />
                                </q-avatar>
                            </td>
                            <td class="text-left">{{ user.firstName }} {{ user.lastName }}</td>
                            <td class="text-left">{{ user.email }}</td>
                            <td class="text-left">{{ $t(`roles.${user.role}`) }}</td>
                            <td class="text-left">
                                {{
                                    new Date(user.createdAt).toLocaleDateString([], {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })
                                }}
                            </td>
                            <td class="text-right">
                                <q-btn
                                    v-if="user.id !== accountStore.state.id"
                                    size="10px"
                                    round
                                    color="secondary"
                                    icon="mdi-cog"
                                    :to="{ name: 'user', params: { id: user.id } }"
                                ></q-btn>
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </q-card-section>

            <q-card-actions class="justify-center">
                <q-pagination
                    v-model="paginationForm.page"
                    :max="usersAction.state.pages"
                    direction-links
                    boundary-links
                    color="secondary"
                />
            </q-card-actions>
        </AppCard>
    </AppPage>
</template>

<script setup lang="ts">
import { api, usePromiseState, type ResponseError } from '@/common';
import type { PaginationDto, PaginationResponse, UserProfileResponse } from '@nx-vnts/shared';
import { reactive, watch } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useQuasar } from 'quasar';
import UserCreateDialog from '@/app/components/dialogs/UserCreateDialog.vue';

const accountStore = useAccountStore();
const $q = useQuasar();

const paginationForm = reactive<PaginationDto>({
    page: 1,
});

const usersAction = usePromiseState<PaginationResponse<UserProfileResponse>, ResponseError>(
    async () => {
        const res = await api.users.getMany(paginationForm);
        return res.data;
    }
);

usersAction.execute(500);

function userCreateDialog(): void {
    $q.dialog({
        component: UserCreateDialog,
    }).onOk(() => {
        usersAction.execute(500);
    });
}

watch(paginationForm, () => {
    usersAction.execute(500);
});
</script>
