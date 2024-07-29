<!-- <template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Date"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header">

      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getListAdmin } from '@/api/users'

@Component({
  name: 'listAdmin',
  components: {

  }
})
export default class extends Vue {
  private listQuery = {
    current_page: 1,
    per_page: 10,
    filter_string: ''
  };

  created() {
    this.fetchData()
  }

  private async fetchData() {
    const data = await getListAdmin(this.listQuery)
    console.log(data)
  }
}
</script>
 -->