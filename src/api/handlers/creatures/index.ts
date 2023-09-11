import addCategoryHandler from './addCategoryHandler'
import addCreatureHandler from './addCreatureHandler'
import deleteCategoryHandler from './deleteCategoryHandler'
import deleteCreatureHandler from './deleteCreatureHandler'
import getCreaturesHandler from './getCreaturesHandler'
import updateCategoryHandler from './updateCategoryHandler'
import updateCreatureHandler from './updateCreatureHandler'

export default {
  addCategory: addCategoryHandler,
  addCreature: addCreatureHandler,
  deleteCategory: deleteCategoryHandler,
  deleteCreature: deleteCreatureHandler,
  getCreatures: getCreaturesHandler,
  updateCategory: updateCategoryHandler,
  updateCreature: updateCreatureHandler
}
