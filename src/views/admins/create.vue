<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form
        v-loading="isLoading"
        ref="createForm"
        :model="createForm"
        :rules="rules"
        class="form-container"
        :label-position="isDesktop ? 'left' : 'top'"
        :label-width="isDesktop ? '120px' : 'auto'"
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
        <el-form-item label=" ">
          <el-checkbox v-model="createForm.isSuper">Is super</el-checkbox>
        </el-form-item>
        <el-form-item label="Config">
          <el-input type="textarea" v-model="createForm.config" :rows="4"></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button type="danger" @click="handleCancel" :disabled="isLoading">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="isLoading">Create</el-button>
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
  private isDesktop = true

  created() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  }

  destroyed() {
    window.removeEventListener('resize', this.checkScreenSize)
  }

  private checkScreenSize() {
    this.isDesktop = window.innerWidth > 768
  }

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
  padding: 20px;
}

.box-card {
  width: 100%;
}

.form-container {
  .el-form-item {
    margin-bottom: 22px;
  }

  .el-input,
  .el-textarea {
    width: 100%;
  }

  .el-checkbox {
    margin-left: 0;
  }

  .button-container {
    display: flex;
    justify-content: flex-start;

    .el-button {
      margin-right: 10px;
    }
  }
}

@media (min-width: 4000px) {
  .form-container {
    .el-form-item {
      display: flex;
      align-items: flex-start;

      .el-form-item__label {
        flex: 0 0 120px;
        padding-top: 11px; // Để căn chỉnh label với input
      }

      .el-form-item__content {
        flex: 1;
        max-width: none; // Loại bỏ giới hạn chiều rộng
      }

      .el-input,
      .el-textarea {
        width: 100%;
      }
    }

    .button-container {
      padding-left: 120px; // Thay vì margin-left
      box-sizing: border-box;
    }
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }

  .box-card {
    padding: 15px;
  }

  .form-container {
    .el-form-item {
      margin-bottom: 15px;
    }

    .el-form-item__label {
      float: none;
      display: block;
      text-align: left;
      padding: 0 0 10px;
      width: 100% !important;
    }

    .el-form-item__content {
      margin-left: 0 !important;
    }

    .el-input,
    .el-textarea {
      width: 100%;
    }

    .button-container {
      padding-left: 0;
    }
  }
}
</style>
