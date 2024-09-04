<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form
        v-loading="isLoading"
        ref="createForm"
        :model="createForm"
        :rules="rules"
        class="form-container"
        label-width="100px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="createForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="createForm.password" type="password"></el-input>
        </el-form-item>
<!--         <el-form-item>
          <el-checkbox v-model="createForm.isMailauthCompleted">Is mailauth completed</el-checkbox>
        </el-form-item> -->
        <el-form-item>
          <el-checkbox v-model="createForm.isSuper">Is super</el-checkbox>
        </el-form-item>
        <el-form-item label="Config">
          <el-input class="el_input_textarea" type="textarea" v-model="createForm.config"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleCancel">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit">Create</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { createAdmin } from '@/api/users'
import { ICreateAdminRequest } from '@/api/types/admin'

@Component({
  name: 'AdminCreate'
})
export default class AdminCreate extends Vue {
  private createForm = {
    name: '',
    email: '',
    password: '',
    isSuper: false,
    isMailauthCompleted: false,
    config: ''
  }

  private rules = {
    name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
    email: [
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ],
    password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
  }

  private isLoading = false

  private handleCancel() {
    this.$router.push({ name: 'AdminList' }) // Assuming you have a route named 'AdminList'
  }

  private async handleSubmit() {
    try {
      await (this.$refs.createForm as any).validate()
    } catch (error) {
      console.error('Form validation failed')
      return
    }

    const model: ICreateAdminRequest = {
      name: this.createForm.name.trim(),
      email: this.createForm.email.trim(),
      password: this.createForm.password.trim(),
      isSuper: this.createForm.isSuper,
      isMailauthCompleted: false,
      config: JSON.parse(this.createForm.config || '{}')
    }

    try {
      this.isLoading = true
      const response = await createAdmin(model)
      if (response) {
        this.$alert(this.$t('message.adminCreateSuccess') as string, '', {
          confirmButtonText: this.$t('text.ok') as string,
          type: 'success',
          center: true,
          callback: () => {
            this.$router.push({
              name: 'AdminList'
            })
          }
        })
      }
    } catch (err) {
      this.$message({
        message: 'Failed to create admin',
        type: 'error',
        duration: 5 * 1000
      })
    }
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .el-input,
  .el_input_textarea {
    width: 50%;
  }
}
</style>
