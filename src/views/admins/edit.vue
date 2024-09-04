<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        class="form-container"
        label-width="100px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
<!--         <el-form-item label="Password" prop="password">
          <el-input v-model="editForm.password" type="password" placeholder="Leave blank to keep current password"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-checkbox disabled v-model="editForm.isMailauthCompleted">Is mailauth completed</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="editForm.isSuper">Is super</el-checkbox>
        </el-form-item>
        <el-form-item label="Config">
          <el-input class="el_input_textarea" type="textarea" v-model="editForm.config"></el-input>
        </el-form-item>
        <el-form-item>
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
// import { ICreateAdminRequest } from '@/api/types/admin'

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

  created() {
    this.fetchAdminData()
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
        config: JSON.stringify(data.config)
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
  .el-input,
  .el_input_textarea {
    width: 50%;
  }
}
</style>
