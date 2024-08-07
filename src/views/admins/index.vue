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
          <span>{{ row.is_mailauth_completed }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="105"
        label="is super"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.is_super }}</span>
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
import { getListAdmin } from '@/api/users'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'AdminList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private list: any[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const response = await getListAdmin(this.listQuery)
    const data = response.data

    this.list = data
    this.total = data.length // Giả sử total là độ dài của danh sách
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
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
