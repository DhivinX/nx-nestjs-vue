<template>
    <AppDialog icon="mdi-plus" :title="$t('users.create.title')" v-slot="{ ok, cancel }">
        <Form
            @submit="saveAction.execute(500, ok)"
            :validation-schema="userCreateSchema"
            :initial-values="form"
        >
            <q-card-section class="scroll" style="max-height: 50vh">
                <div class="row q-col-gutter-md">
                    <q-select
                        class="col-12"
                        name="role"
                        v-model="form.role"
                        :disable="saveAction.isLoading"
                        :label="$t('users.create.role')"
                        :options="rolesSelectionTable"
                        outlined
                        emit-value
                        map-options
                    >
                        <template v-slot:prepend>
                            <q-icon name="mdi-shield-star" />
                        </template>
                    </q-select>

                    <VInput
                        class="col-12"
                        name="firstName"
                        v-model="form.firstName"
                        :disable="saveAction.isLoading"
                        :label="$t('users.create.first_name')"
                        outlined
                    >
                        <template v-slot:prepend>
                            <q-icon name="mdi-account" />
                        </template>
                    </VInput>

                    <VInput
                        class="col-12"
                        name="lastName"
                        v-model="form.lastName"
                        :disable="saveAction.isLoading"
                        :label="$t('users.create.last_name')"
                        outlined
                    >
                        <template v-slot:prepend>
                            <q-icon name="mdi-account" />
                        </template>
                    </VInput>

                    <VInput
                        class="col-12"
                        name="email"
                        v-model="form.email"
                        :disable="saveAction.isLoading"
                        :label="$t('users.create.email')"
                        :error="isUserExistsError"
                        outlined
                    >
                        <template v-slot:prepend>
                            <q-icon name="mdi-at" />
                        </template>
                    </VInput>

                    <VInput
                        class="col-12"
                        name="password"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        v-model="form.password"
                        :disable="saveAction.isLoading"
                        :label="$t('users.create.password')"
                        outlined
                    >
                        <template v-slot:prepend>
                            <q-icon name="mdi-lock" />
                        </template>
                        <template v-slot:append>
                            <q-icon
                                :name="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                                @click="isPasswordVisible = !isPasswordVisible"
                            />
                        </template>
                    </VInput>
                </div>
            </q-card-section>

            <q-card-section class="text-center text-negative" v-if="saveError">
                {{ saveError }}
            </q-card-section>

            <q-card-actions>
                <q-space />
                <q-btn
                    color="secondary"
                    icon="mdi-close"
                    :label="$t('cancel')"
                    :disable="saveAction.isLoading"
                    @click="cancel"
                    rounded
                />

                <q-btn
                    color="primary"
                    icon="mdi-check"
                    :label="$t('save')"
                    :loading="saveAction.isLoading"
                    :disable="saveAction.isLoading"
                    type="submit"
                    rounded
                />
            </q-card-actions>
        </Form>
    </AppDialog>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { Role, UserCreateDto, userCreateSchema } from '@nx-vnts/shared';
import { useI18n } from 'vue-i18n';
import { computed, reactive, ref, watch } from 'vue';
import { api, usePromiseState, ResponseError } from '@/common';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { t } = useI18n();

const isPasswordVisible = ref(false);

const rolesSelectionTable = Object.values(Role).map((role) => ({
    label: t(`roles.${role}`),
    value: role,
}));

const form = reactive<UserCreateDto>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: Role.User,
});

const saveAction = usePromiseState<void, ResponseError>(async (ok: () => void) => {
    await api.users.createOne(form);

    $q.notify({
        icon: 'mdi-check',
        color: 'positive',
        message: t('saved_successfully'),
        timeout: 1000,
    });

    ok();
});

const saveError = computed<string>(() => {
    if (saveAction.error && saveAction.error.response.status === 409)
        return t('users.create.errors.user_exists');

    if (saveAction.error) return t('users.create.errors.default');

    return undefined;
});

const isUserExistsError = computed<boolean>(() => {
    return saveAction.error && saveAction.error.response.status === 409;
});

watch(form, () => {
    saveAction.error = undefined;
});
</script>
