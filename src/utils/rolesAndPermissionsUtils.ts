import {
  DefaultUserRoleFeature,
  MappedChildFeatureToSubFeatureItem,
  MappedFeatureItem,
  UserRoleSubFeature,
} from '../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'

const mapChildFeaturesToFeatures = (
  featuresUnderRole: DefaultUserRoleFeature[],
  childFeatures: DefaultUserRoleFeature[],
): MappedChildFeatureToSubFeatureItem[] => {
  return childFeatures?.map((childFeatureItem) => {
    const filteredFeature = featuresUnderRole.find(
      (featureItem) => featureItem.featureId === childFeatureItem.featureId,
    )
    if (filteredFeature !== undefined) {
      // if features exists for that specific role and returning values if checked or not
      return {
        ...childFeatureItem,
        viewaccessChecked: filteredFeature.viewaccess ?? false,
        deleteaccessChecked: filteredFeature.deleteaccess ?? false,
        createaccessChecked: filteredFeature.createaccess ?? false,
        updateaccessChecked: filteredFeature.updateaccess ?? false,
      }
    }
    return { ...childFeatureItem }
  })
}

export const mapFeaturesToSubFeaturesRoleConfiguration = (
  featuresUnderRole: DefaultUserRoleFeature[],
  subFeaturesList: UserRoleSubFeature[],
): MappedFeatureItem[] => {
  // sub features list is the common list which tells if checkboxes exists for each feature
  return subFeaturesList?.map((subFeatureListItem) => {
    const mappedFeatures = subFeatureListItem.features?.map(
      (subFeatureItem) => {
        // finding each feature in the features under role
        const filteredFeature = featuresUnderRole.find(
          (featureItem) => featureItem.featureId === subFeatureItem.featureId,
        )
        let mappedChildFeature: MappedChildFeatureToSubFeatureItem[] = []
        if (subFeatureItem.childFeatures.length !== 0) {
          // if there are child features we map them too
          mappedChildFeature = mapChildFeaturesToFeatures(
            featuresUnderRole,
            subFeatureItem.childFeatures,
          )
        }
        if (filteredFeature !== undefined) {
          // if it exists in features under role and checking if user is allowed that permission
          return {
            ...subFeatureItem,
            viewaccessChecked: filteredFeature.viewaccess ?? false,
            deleteaccessChecked: filteredFeature.deleteaccess ?? false,
            createaccessChecked: filteredFeature.createaccess ?? false,
            updateaccessChecked: filteredFeature.updateaccess ?? false,
            childFeatures: mappedChildFeature,
          }
        }
        // returning with mapped child features
        return { ...subFeatureItem, childFeatures: mappedChildFeature }
      },
    )
    // returning the complete feature
    return { ...subFeatureListItem, features: mappedFeatures }
  })
}
