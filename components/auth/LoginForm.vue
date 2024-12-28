<script setup lang="ts">
import { ref,defineProps } from 'vue';
import { useFetch,useRuntimeConfig } from '#app';
import type { LoginResponse } from '@/types/auth/auth'; // Import interface
// interface LoginResponse {
//   data: {
//     CreatedAt: string;
//     UpdatedAt: string;
//     DeletedAt: string | null;
//     ID: number;
//     UserID: number;
//     Email: string;
//     Password: string;
//     AccountType: string;
//   };
//   message: string;
//   statusCode: number;
// }
const router = useRouter(); 
const props = defineProps({
  userType: {
    type: String,
    required: true,
  },
});
const config = useRuntimeConfig(); 
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
 // Gunakan base URL dinamis
const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  const baseUrl = config.public.apiBase;
  const { data, error } = await useFetch<LoginResponse>(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
      type:props.userType.toLowerCase()
    },
  });

  loading.value = false;
  const checkbox = ref(false);

  if (error.value) {
    errorMessage.value = error.value.message;
  } else if (data.value && data.value.statusCode !== 200) {
    errorMessage.value = 'Login failed. Please check your credentials.';
  } else {
    console.log('User logged in:', data.value);
    if (data.value){
        localStorage.setItem('user',JSON.stringify(data.value.data))
        localStorage.setItem('isLogin',"true")

        router.push({ path: '/' });

    } 

    router.push({ path: '/' });
    // Redirect to dashboard or handle success
  }
};
</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Login {{ userType }}</span>
        </div>
    </div>
    <div>
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Email</v-label>
                <v-text-field v-model="email" variant="outlined" class="pwdInput" hide-details color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Password</v-label>
                <v-text-field v-model="password" variant="outlined" class="border-borderColor" type="password" hide-details
                    color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </v-col>
            <!-- <v-col cols="12 " class="py-0">
                <div class="d-flex flex-wrap align-center w-100 ">
                    <v-checkbox hide-details v-model="" color="primary">
                        <template v-slot:label class="">Remeber this Device</template>
                    </v-checkbox>
                </div>
            </v-col> -->
            <v-col cols="12">
                <v-btn  :loading="loading"  @click="handleLogin" size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" flat>Sign
                    In</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
