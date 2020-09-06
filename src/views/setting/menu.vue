<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="isShowAddRole=true">添加菜单</el-button>
    </el-row>
    <el-table v-loading="listLoading" :data="list" row-key="id" element-loading-text="Loading" border fit highlight-current-row :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="名称" width="110">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否启用" width="110" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small">编辑<i class="el-icon-edit"></i></el-button>
          <el-button type="danger" size="small">删除<i class="el-icon-delete"></i></el-button>
          <el-button type="warning" size="small">添加下级<i class="el-icon-plus"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-role :dialogRoleVisible="isShowAddRole" @onCancel="isShowAddRole=false"></add-role>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import addRole from './components/add-role'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    addRole
  },
  data() {
    return {
      isShowAddRole: false,
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      this.list = [
        {
          id: 1,
          name: '系统权限',
          status: true,
          author: 'admin',
          createTime: new Date(),
          children: [
            {

              id: 2,
              name: '角色管理',
              status: false,
              author: 'admin',
              createTime: new Date()
            },
            {

              id: 3,
              name: '菜单管理',
              status: false,
              author: 'admin',
              createTime: new Date()
            }
          ]
        },

      ]
      this.listLoading = false
    }
  }
}
</script>
