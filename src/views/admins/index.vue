<template>
  <div class="app-container">
    <div class="button-container">
      <router-link :to="{name: 'CreateAdmin'}">
        <el-button
          type="primary"
          icon="el-icon-edit"
        >
          Add
        </el-button>
      </router-link>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="ID"
          min-width="40"
        >
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Name"
          min-width="150"
        >
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Email"
          min-width="200"
        >
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="is mailauth completed"
          min-width="150"
        >
          <template slot-scope="{row}">
            <span>{{ row.isMailauthCompleted }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="is super"
          min-width="80"
        >
          <template slot-scope="{row}">
            <span>{{ row.isSuper }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="Actions"
          min-width="150"
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
    </div>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;

  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
  }

  .el-table {
    width: 100%;
  }

  .el-button-delete {
    margin-left: 5px;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 10px;

    .el-table {
      font-size: 14px;
    }

    .el-button {
      font-size: 12px;
    }
  }
}
</style>
