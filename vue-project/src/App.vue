<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormProps, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  password: string
  code: string
}

const ApiUrl = '/api/user/code'

const ruleFormRef = ref<FormInstance>()
const labelPosition = ref<FormProps['labelPosition']>('right')

const codeUrl = ref<string>(ApiUrl)

const resetCode = () => (codeUrl.value = ApiUrl + '?' + Math.random())

const ruleForm = reactive({
  name: '',
  password: '',
  code: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: 'Please input code',
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      fetch('/api/user/create', {
        method: 'post',
        body: JSON.stringify(ruleForm),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="wraps">
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      label-width="auto"
      :model="ruleForm"
      :rules="rules"
      style="max-width: 600px"
    >
      <el-form-item label="Name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="Code">
        <el-input v-model="ruleForm.code" />
        <img @click="resetCode" :src="codeUrl" alt="captcha-code" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
