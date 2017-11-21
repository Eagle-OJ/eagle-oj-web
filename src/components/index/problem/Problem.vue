<template>
    <div id="container">
        <Row :gutter="10">
            <Col span="18" class="left">
                <Row class="header">
                    <Col span="10">
                        <Input v-model="searchQuery" placeholder="输入题目编号"></Input>
                    </Col>
                    <Col span="14" class="sort">
                        <div class="difficulty">
                            <Dropdown trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)">
                                    难度
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>简单</DropdownItem>
                                    <DropdownItem>中等</DropdownItem>
                                    <DropdownItem>困难</DropdownItem>
                                    <DropdownItem>专家</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="status">
                            <Dropdown trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)">
                                    状态
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>未做</DropdownItem>
                                    <DropdownItem>失败</DropdownItem>
                                    <DropdownItem>成功</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="tags">
                            <span>标签</span>
                            <Select v-model="tags" style="width: 120px">
                                <OptionGroup label="Hot Cities">
                                    <Option v-for="item in tags" :value="item.id" :key="item.id">链表</Option>
                                </OptionGroup>
                            </Select>
                        </div>
                    </Col>
                </Row>
                <div class="problems">
                    <Table :columns="problems.colums" :data="problems.data"></Table>
                    <div class="page">
                        <Page :total="40" size="small" show-total></Page>
                    </div>
                </div>
            </Col>
            <Col span="6" class="right">
                <Card class="user_info">
                    <i-circle :size="200" :percent="75">
                        <div class="detail">
                            <h1>64</h1>
                            <p>已做过</p>
                            <span>
                                通过率
                                <i>75%</i>
                            </span>
                        </div>
                    </i-circle>
                    <div class="cover">
                        <p>登入查看信息</p>
                    </div>
                </Card>
                <Card>
                    i dont know
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            tags: [
                {
                    id: 1,
                },
                {
                    id: 1,
                },
                {
                    id: 1,
                },
                {
                    id: 1,
                }
            ],
            problems: {
                colums: [
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('Icon', {
                                props: {
                                    type: 'checkmark'
                                }
                            }, 'xx')
                        }
                    },
                    {
                        title: '标题',
                        key: 'title',
                        render: (h, params) => {
                            return h('router-link', {
                                props: {
                                    to: '#'
                                }
                            }, params.row.title)
                        }
                    },
                    {
                        title: '通过率',
                        key: 'acceptance'
                    },
                    {
                        title: '难度',
                        key: 'difficulty',
                        render: (h, params) => {
                            return h('Tag', {
                                props: {
                                    color: this.getDifficultyColor(params.row.difficulty)
                                }
                            }, this.getDifficultyText(params.row.difficulty))
                        }
                    },
                ],
                data: [
                    {
                        title: 'A+B problems',
                        acceptance: '19.5%',
                        difficulty: 1,
                    },
                    {
                        title: 'A+B problems',
                        acceptance: '19.5%',
                        difficulty: 1,
                    },
                    {
                        title: 'A+B problems',
                        acceptance: '19.5%',
                        difficulty: 1,
                    },
                    {
                        title: 'A+B problems',
                        acceptance: '19.5%',
                        difficulty: 1,
                    },
                ]
            }
        }
    },
    methods: {
        getDifficultyColor(name) {
            if(name == 0)
                return 'green'
            else if (name == 1) 
                return 'blue'
            else if (name == 2)
                return 'yellow'
            else
                return 'red'
        },
        getDifficultyText(name) {
            if(name == 0)
                return '简单'
            else if (name == 1) 
                return '中等'
            else if (name == 2)
                return '困难'
            else
                return '专家'
        }
    },
    
}
</script>


<style lang="stylus" scoped>
    @import 'problem.stylus'
</style>


