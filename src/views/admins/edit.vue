<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        class="form-container"
        :label-position="isDesktop ? 'left' : 'top'"
        :label-width="isDesktop ? '120px' : 'auto'"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox disabled v-model="editForm.isMailauthCompleted">Is mailauth completed</el-checkbox>
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox v-model="editForm.isSuper">Is super</el-checkbox>
        </el-form-item>
        <el-form-item label="Config">
          <el-input type="textarea" v-model="editForm.config" :rows="4"></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button type="danger" @click="handleCancel" :disabled="isLoading">Cancel</el-button>
          <el-button type="primary" @click="handleUpdate" :loading="isLoading">Update</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getDetailAdmin, updateAdmin } from '@/api/users'

@Component({
  name: 'EditAdmin'
})
export default class EditAdmin extends Vue {
  private editForm = {
    name: '',
    email: '',
    isSuper: false,
    isMailauthCompleted: false,
    config: ''
  }

  private rules = {
    name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
    email: [
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]
  }

  private isLoading = false
  private isDesktop = true

  created() {
    this.fetchAdminData()
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  }

  destroyed() {
    window.removeEventListener('resize', this.checkScreenSize)
  }

  private checkScreenSize() {
    this.isDesktop = window.innerWidth > 768
  }

  private async fetchAdminData() {
    const adminId: number = parseInt(this.$route.params.id, 10)
    this.isLoading = true
    try {
      const data: any = await getDetailAdmin(adminId)
      this.editForm = {
        name: data.name,
        email: data.email,
        isSuper: data.is_super,
        isMailauthCompleted: data.is_mailauth_completed,
        config: JSON.stringify(data.config, null, 2)
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      this.$message({
        message: this.$t('message.fetchAdminFail') as string,
        type: 'error',
        duration: 5000
      })
    } finally {
      this.isLoading = false
    }
  }

  private handleCancel() {
    if (!this.isLoading) {
      this.$router.push({ name: 'AdminList' })
    }
  }

  private async handleUpdate() {
    try {
      await (this.$refs.editForm as any).validate()
    } catch (error) {
      console.error('Form validation failed')
      return
    }

    this.isLoading = true

    const model: any = {
      name: this.editForm.name.trim(),
      email: this.editForm.email.trim(),
      is_super: this.editForm.isSuper,
      is_mailauth_completed: this.editForm.isMailauthCompleted,
      config: JSON.parse(this.editForm.config || '{}')
    }

    try {
      const adminId: number = parseInt(this.$route.params.id, 10)
      const response = await updateAdmin(adminId, model)
      if (response) {
        this.$message({
          message: this.$t('message.adminUpdateSuccess') as string,
          type: 'success',
          duration: 5000
        })

        this.$router.push({ name: 'AdminList' })
      } else {
        throw new Error('No data received from server')
      }
    } catch (err) {
      console.error('Failed to update admin:', err)
      this.$message({
        message: this.$t('message.adminUpdateFail') as string,
        type: 'error',
        duration: 5000
      })
    } finally {
      this.isLoading = false
    }
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
        padding-top: 11px;
      }

      .el-form-item__content {
        flex: 1;
        max-width: none;
      }

      .el-input,
      .el-textarea {
        width: 100%;
      }
    }

    .button-container {
      padding-left: 120px;
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
