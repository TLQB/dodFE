<template>
  <div class="app-container">
    <router-link :to="{name: 'CreateAdmin'}">
      <el-button
        type="primary"
        icon="el-icon-edit"
      >
        Add
      </el-button>
    </router-link>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="80"
        align="center"
        label="ID"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180"
        align="center"
        label="Name"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="260"
        align="center"
        label="Email"
      >
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180"
        label="is mailauth completed"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.isMailauthCompleted }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="105"
        label="is super"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.isSuper }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="240"
      >
        <template slot-scope="{row}">
          <router-link :to="'/admin/'+row.id + '/'">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
              Detail
            </el-button>

          </router-link>

          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            class="el-button-delete"
            @click="handleDelete(row.id)"
          >
            Delete
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getListAdmin, deleteAdmin } from '@/api/users'
import Pagination from '@/components/Pagination/index.vue'
import { camelizeKeys } from '@/utils/parse'

interface AdminItem {
  id: number
  name: string
  email: string
  password: string
  isMailauthCompleted: boolean
  isEnabled: boolean
  config: Record<string, any>
  isSuper: boolean
}

@Component({
  name: 'AdminList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private list: AdminItem[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    current_page: 1,
    per_page: 20
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const response: any = await getListAdmin(this.listQuery)
    const data: AdminItem[] = camelizeKeys(response.items)
    this.list = data
    this.total = response.total
    this.listQuery.current_page = response.current_page
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleDelete(id: number) {
    if (id) {
      this.$confirm('Are you sure you want to delete admin?', 'Confirm',
        {
          confirmButtonText: this.$tc('text.ok'),
          cancelButtonText: this.$tc('text.cancel'),
          type: 'warning'
        })
        .then(async() => {
          try {
            await deleteAdmin(id)
            this.$alert(
              this.$t('message.deleteAdminSuccess') as string,
              '',
              {
                confirmButtonText: this.$t('text.ok') as string,
                type: 'success',
                center: true,
                callback: () => {
                  const index = this.list.findIndex(function(item) {
                    return item.id === id
                  })
                  this.list.splice(index, 1)
                  this.getList()
                }
              }
            )
          } catch {
          }
        }).catch(() => {
          //
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .el-table {
    margin-top: 30px;
  }
  .el-button-delete{
    margin-left: 10px;
  }
}
</style>
